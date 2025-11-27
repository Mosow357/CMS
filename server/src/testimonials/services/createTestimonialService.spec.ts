import { Repository } from 'typeorm';
import { Testimonial } from '../entities/testimonial.entity';
import { CreateTestimonialsService } from './createTestimonial.service';
import { MediaStorageService } from 'src/media-storage/services/mediaStorage.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTestimonialDto } from '../dto/create-testimonial.dto';
import { Readable } from 'stream';
import { MockType } from 'test/types';
import { InternalServerErrorException } from '@nestjs/common';
import { MediaType } from '../enums/mediaType';

describe('CreateTestimonialsService', () => {
  let service: CreateTestimonialsService;
  let testimonialRepo: MockType<Repository<Testimonial>>;
  let mediaStorageService: jest.Mocked<MediaStorageService>;

  const mockTestimonialRepo = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const repositoryMockFactory: () => MockType<Repository<Testimonial>> =
    jest.fn(() => ({
      create: jest.fn((entity) => entity),
      save: jest.fn((entity) => Promise.resolve({ id: 'test-id', ...entity })),
    }));

  testimonialRepo = repositoryMockFactory();
  const mockMediaStorageService = {
    uploadFile: jest.fn(),
  };

  const mockAiService = {
    evaluateTestimonial: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateTestimonialsService,
        {
          provide: getRepositoryToken(Testimonial),
          useValue: mockTestimonialRepo,
        },
        {
          provide: MediaStorageService,
          useValue: mockMediaStorageService,
        },
      ],
    }).compile();
    service = module.get<CreateTestimonialsService>(CreateTestimonialsService);
    testimonialRepo = module.get(getRepositoryToken(Testimonial));
    mediaStorageService = module.get(MediaStorageService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const createdTestimonialTextDto: CreateTestimonialDto = {
    content: 'test_content',
    title: '',
    media_type: MediaType.TEXT,
    category_id: "category-123",
    organitation_id: "org-123",
  };
  const createdTestimonialVideoDto: CreateTestimonialDto = {
    content: 'test_content',
    title: '',
    media_type: MediaType.VIDEO,
    category_id: "category-123",
    organitation_id: "org-123",
  };
  const createdTestimonialImageDto: CreateTestimonialDto = {
    content: 'test_content',
    title: '',
    media_type: MediaType.IMAGE,
    category_id: "category-123",
    organitation_id: "org-123",
  };

  const mockFileStream = Readable.from(['fake data']);
  const mockFilename = 'testimonial_video.mp4';

  describe('createTestimonial', () => {
    it('should create a testimonial without media, aproved', async () => {
      const mockTestimonial: Testimonial = {
        ...createdTestimonialTextDto,
      } as Testimonial;
      testimonialRepo.create?.mockReturnValue(mockTestimonial);

      testimonialRepo.save?.mockResolvedValue(mockTestimonial);

      const result = await service.createTestimonial(createdTestimonialTextDto);

      expect(testimonialRepo.create).toHaveBeenCalledWith(
        createdTestimonialTextDto,
      );
      expect(testimonialRepo.save).toHaveBeenCalledWith({
        ...mockTestimonial,
        status: 'aproved',
      });
      expect(result).toEqual(mockTestimonial);
    });
  });
  describe('createTestimonial', () => {
    it('should create a testimonial with video, aproved', async () => {
      //arrange
      const mockTestimonial: Testimonial = {
        ...createdTestimonialVideoDto,
      } as Testimonial;
      testimonialRepo.create?.mockReturnValue(mockTestimonial);

      testimonialRepo.save?.mockResolvedValue(mockTestimonial);

      //act
      const result = await service.createTestimonialWithMedia(
        createdTestimonialTextDto,
        mockFileStream,
        mockFilename,
      );

      //assert
      expect(testimonialRepo.create).toHaveBeenCalledWith(
        createdTestimonialTextDto,
      );
      expect(testimonialRepo.save).toHaveBeenCalledWith({
        ...mockTestimonial,
        status: 'aproved',
      });
      expect(result).toEqual(mockTestimonial);
    });
  });
  describe('createTestimonial', () => {
    it('should create a testimonial with image, aproved', async () => {
      //arrange
      const mockTestimonial: Testimonial = {
        ...createdTestimonialImageDto,
      } as Testimonial;
      testimonialRepo.create?.mockReturnValue(mockTestimonial);

      testimonialRepo.save?.mockResolvedValue(mockTestimonial);

      //act
      const result = await service.createTestimonialWithMedia(
        createdTestimonialTextDto,
        mockFileStream,
        mockFilename,
      );

      //assert
      expect(testimonialRepo.create).toHaveBeenCalledWith(
        createdTestimonialTextDto,
      );
      expect(testimonialRepo.save).toHaveBeenCalledWith({
        ...mockTestimonial,
        status: 'aproved',
      });
      expect(result).toEqual(mockTestimonial);
    });
  });
  describe('createTestimonial', () => {
    it('should throw error from media storage provider', async () => {
      //arrange
      const mockTestimonial: Testimonial = {
        ...createdTestimonialImageDto,
      } as Testimonial;
      testimonialRepo.create?.mockReturnValue(mockTestimonial);
      mediaStorageService.uploadFile.mockRejectedValue(
        new Error('Storage provider error'),
      );
      testimonialRepo.save?.mockResolvedValue(mockTestimonial);

      // act and assert
      await expect(
        service.createTestimonialWithMedia(
          createdTestimonialTextDto,
          mockFileStream,
          mockFilename,
        ),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
