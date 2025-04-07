export class Event {
  public static IDX = 0;
  public id: number;
  public nom: string;
  public date: string;
  public heure: string;
  public lien: string;
  constructor(nom: string, date: string, heure: string, lien: string) {
    this.nom = nom;
    this.date = date;
    this.heure = heure;
    this.lien = lien;
    this.id = Event.IDX;
    Event.IDX++;
  }
}
