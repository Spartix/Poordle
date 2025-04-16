import { ImageSourcePropType } from "react-native";

type Config = {
  passerelle_version: string;
  histogramme: boolean;
  message_non_publication_releve: string;
  releve_PDF: boolean;
  liste_dep_publi_PDF: string;
  etudiant_modif_photo: boolean;
  acces_enseignants: boolean;
  cloisonner_enseignants: boolean;
  analystics_interne: boolean;
  envoi_donnees_version: boolean;
  analyse_temps_requetes: boolean;
  nom_IUT: string;
  doc_afficher_nip: boolean;
  doc_afficher_id: boolean;
  doc_afficher_date_naissance: boolean;
  idReg: string;
  idPlaceHolder: string;
  idInfo: string;
  nameReg: string;
  namePlaceHolder: string;
  nameInfo: string;
  module_absences: boolean;
  afficher_absences: boolean;
  data_absences_scodoc: boolean;
  metrique_absences: string;
  autoriser_justificatifs: boolean;
  liste_dep_ok_justificatifs: string;
  liste_dep_publi_absences: string;
  message_rapport_absences: string;
  message_justificatifs: string;
  absence_heureDebut: number;
  absence_heureFin: number;
  absence_pas: number;
  absence_dureeSeance: number;
  session: string;
  name: string;
  statut: number;
};
type Auth = {
  session: string;
  name: string;
  statut: number;
};
type Semestre = {
  titre: string;
  formsemestre_id: number;
  semestre_id: number;
  annee_scolaire: string;
};

type Semestres = Semestre[];
type Etudiant = {
  boursier: string;
  civilite_etat_civil: string | null;
  civilite: string;
  code_ine: string;
  code_nip: string;
  date_naissance: string;
  dept_acronym: string;
  dept_id: number;
  dept_naissance: string;
  email: string;
  emailperso: string;
  etat_civil: string;
  etudid: number;
  lieu_naissance: string;
  nationalite: string;
  nom: string;
  nomprenom: string;
  prenom_etat_civil: string;
  prenom: string;
  fiche_url: string;
  photo_url: string;
  id: number;
  domicile: string;
  villedomicile: string;
  telephone: string;
  fax: string;
  description: string;
  codepostaldomicile: string;
  paysdomicile: string;
  telephonemobile: string;
  typeadresse: string;
};
type Formation = {
  id: number;
  acronyme: string;
  titre_officiel: string;
  titre: string;
};
type Options = {
  show_abs: boolean;
  show_abs_modules: boolean;
  show_ects: boolean;
  show_codemodules: boolean;
  show_matieres: boolean;
  show_rangs: boolean;
  show_ue_rangs: boolean;
  show_mod_rangs: boolean;
  show_moypromo: boolean;
  show_minmax: boolean;
  show_minmax_mod: boolean;
  show_minmax_eval: boolean;
  show_coef: boolean;
  show_ue_cap_details: boolean;
  show_ue_cap_current: boolean;
  show_temporary: boolean;
  temporary_txt: string;
  show_uevalid: boolean;
  show_date_inscr: boolean;
  block_moyenne_generale: boolean;
  bgcolor: string;
};
type Note = {
  value: string;
  min: string;
  max: string;
  moy: string;
};
export type Evaluations = {
  id: number;
  coef: string;
  description: string;
  evaluation_type: number;
  note: Note;
}[];
export type Ressource = {
  [key: string]: {
    id: number;
    titre: string;
    code_apogee: string;
    url: string;
    moyenne: any;
    evaluations: Evaluations;
  };
};
type SAE = {
  [key: string]: {
    id: number;
    titre: string;
    code_apogee: string;
    url: string;
    moyenne: any;
    evaluations: Evaluations[];
  };
};
type Groupe = {
  group_name: string;
  partition_id: number;
  numero: number;
  id: number;
  edt_id: any;
  partition: {
    id: number;
    bul_show_rank: boolean;
    groups_editable: boolean;
    partition_name: string;
    formsemestre_id: number;
    numero: number;
    show_in_lists: boolean;
    partition_id: number;
  };
};

type Rang = {
  value: string;
  total: number;
  groupes: {};
};
type ReleveSemestre = {
  etapes: any[];
  date_debut: string;
  date_fin: string;
  annee_universitaire: string;
  numero: number;
  inscription: string;
  groupes: Groupe[];
  notes: Note;
  rang: Rang;
};

type Releve = {
  version: string;
  type: string;
  date: string;
  publie: boolean;
  etat_inscription: string;
  etudiant: Etudiant;
  formation: Formation;
  formsemestre_id: number;
  options: Options;
  appreciation: [];
  ressources: Ressource;
  saes: SAE;
  ues_capitalisees: any;
  semestre: ReleveSemestre;
  ues: UES;
};
type MoyenneUE = Note & {
  rang: string;
  total: number;
};
type UES = {
  [key: string]: {
    id: number;
    titre: string;
    numero: number;
    type: number;
    color: string;
    competence: any;
    moyenne: MoyenneUE;
    bonus: string;
    malus: string;
    capitalise: any | null;
    ressources: {
      [key: string]: {
        id: number;
        coef: number;
        moyenne: string;
      };
    };
    saes: {
      [key: string]: {
        id: number;
        coef: number;
        moyenne: string;
      };
    };
  };
};
type Absences = {
  [key: string]: [
    {
      idAbs: number;
      idJustif: [];
      debut: number;
      fin: number;
      statut: "present" | "absent" | "retard";
      justifie: boolean;
      enseignant: string;
      matiereComplet: number;
      dateFin: string;
    }
  ];
};
type AbsenceDetails = {
  journee: number;
  demi: number;
  heure: number;
  compte: number;
};

type TotauxAbsences = {
  present: AbsenceDetails;
  retard: {
    journee: number;
    demi: number;
    heure: number;
    compte: number;
    justifie: AbsenceDetails;
    non_justifie: AbsenceDetails;
  };
  absent: {
    journee: number;
    demi: number;
    heure: number;
    compte: number;
    justifie: AbsenceDetails;
    non_justifie: AbsenceDetails;
  };
  total: AbsenceDetails;
};

export interface ReleveNoteResponse {
  config: Config;
  auth: Auth;
  semestres: Semestres;
  relevé: Releve;
  ues: UES;
  absences: Absences;
  totauxAbsences: TotauxAbsences;
}
