import { Controller, Get } from '@nestjs/common';
import { TagService } from '@app/tag/tag.service';

@Controller()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('tags')
  async getAllTags(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.getAllTags();

    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
