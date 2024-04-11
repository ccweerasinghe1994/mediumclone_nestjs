import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getAllTags(): string[] {
    return ['tag1', 'tag2'];
  }
}
