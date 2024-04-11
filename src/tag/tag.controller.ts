import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('tags')
  getAllTags(): string[] {
    return this.tagService.getAllTags();
  }
}
