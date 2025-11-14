import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/tag.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const tag = this.tagsRepository.create(createTagDto);
    return this.tagsRepository.save(tag);
  }

  async findAll(param:PaginationDto): Promise<Tag[]> {
    const {limit,offset} = param
    return this.tagsRepository.find({
      relations: ['testimonials'],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: { id },
      relations: ['testimonials'],
    });
    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }
    return tag;
  }

  async update(id: string, updateTagDto: UpdateTagDto): Promise<Tag> {
    const tag = await this.findOne(id);
    Object.assign(tag, updateTagDto);
    return this.tagsRepository.save(tag);
  }

  async remove(id: string): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagsRepository.remove(tag);
  }
}
