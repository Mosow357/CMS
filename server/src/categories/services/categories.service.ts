import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoriesRepository.create(createCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async findAll(param:PaginationDto): Promise<Category[]> {
    const {limit,offset} = param
    return this.categoriesRepository.find({
      relations: ['testimonials'],
      skip: offset,
      take: limit
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['testimonials'],
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoriesRepository.remove(category);
  }
}
