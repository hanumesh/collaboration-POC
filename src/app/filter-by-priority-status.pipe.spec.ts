import { FilterByPriorityStatusPipe } from './filter-by-priority-status.pipe';

describe('FilterByPriorityStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByPriorityStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
