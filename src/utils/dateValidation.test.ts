import { dateValidation } from './dateValidation';
// is date valid date?
test('expect dateValidation to return true', () => {
    expect(dateValidation('2022-10-31T09:00:00Z')).toBeTruthy();
});
