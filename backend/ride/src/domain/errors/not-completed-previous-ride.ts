export class NotCompletedPreviousRideError extends Error {
  constructor() {
    super("Previous ride is not completed");
    
  }
}