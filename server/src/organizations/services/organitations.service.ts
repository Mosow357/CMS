import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '../entities/organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto): Promise<Organization> {
    const organization = this.organizationRepository.create(createOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  async findAllUserOrganization(userId: string): Promise<Organization[]> {
  const organizations = await this.organizationRepository.find({
    relations: {
      userOrganizations: {
        user: true
      }
    },
    where: {
      userOrganizations: {
        userId: userId
      }
    }
  });
  
  return organizations;
}

  async findOne(id: string): Promise<Organization> {
    const organization = await this.organizationRepository.findOne({
      where: { id },
      relations: ['members'],
    });
    if (!organization) {
      throw new NotFoundException(`Organization with ID ${id} not found`);
    }
    return organization;
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto): Promise<Organization> {
    const organization = await this.findOne(id);
    Object.assign(organization, updateOrganizationDto);
    return this.organizationRepository.save(organization);
  }

  async remove(id: string): Promise<void> {
    const organization = await this.findOne(id);
    await this.organizationRepository.remove(organization);
  }
}
