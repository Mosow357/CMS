import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryParamsDto } from 'src/common/dto/queryParams.dto';
import { CreateOrganizationDto } from '../dto/create-organization.dto';
import { UpdateOrganizationDto } from '../dto/update-organization.dto';
import { Organization } from '../entities/organization.entity';
import { UserOrganization } from 'src/user_organization/entities/userOrganization.entity';
import { User } from 'src/users/entities/user.entity';
import { OrganizationRole } from 'src/common/types/userRole';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,
    @InjectRepository(UserOrganization)
    private userOrganizationRepository: Repository<UserOrganization>,
  ) { }

  async create(createOrganizationDto: CreateOrganizationDto, user: User): Promise<Organization> {
    const organization = this.organizationRepository.create({
      ...createOrganizationDto
    });
    await this.organizationRepository.save(organization)

    const userOrganization = this.userOrganizationRepository.create({
      userId: user.id,
      organizationId: organization.id,
      role: OrganizationRole.ADMINISTRATOR,
    })
    await this.userOrganizationRepository.save(userOrganization);

    return organization
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
