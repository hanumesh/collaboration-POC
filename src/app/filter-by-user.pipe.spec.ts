import { FilterByUserPipe } from './filter-by-user.pipe';

describe('FilterByUserPipe', () => {
  it('create an instance', () => {
    const pipe = new FilterByUserPipe();
    expect(pipe).toBeTruthy();
  });
});
