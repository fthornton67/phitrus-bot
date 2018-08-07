import { AttendeeModule } from './attendee.module';

describe('AttendeeModule', () => {
  let attendeeModule: AttendeeModule;

  beforeEach(() => {
    attendeeModule = new AttendeeModule();
  });

  it('should create an instance', () => {
    expect(attendeeModule).toBeTruthy();
  });
});
