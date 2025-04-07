import { ReleveNoteResponse } from "../interfaces/ReleveNoteResponse";

export class ReleveManager {
  private releveDeNote: ReleveNoteResponse;
  constructor(releve: ReleveNoteResponse) {
    this.releveDeNote = releve;
  }
  public getReleveDeNote(): ReleveNoteResponse {
    return this.releveDeNote;
  }
}
