export class Log {
  counterMessage(counter) {
    return counter
      ? `Founded ${counter} repositories`
      : "No repositories found";
  }
}
