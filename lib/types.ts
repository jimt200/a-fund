export type CampaignStatus = 'draft' | 'validation' | 'levee' | 'production' | 'terminee'
export type RiskLevel = 'faible' | 'modere' | 'eleve'
export type UserRole = 'investisseur' | 'cooperative' | 'fournisseur' | 'acheteur' | 'admin'
export type KycStatus = 'non_soumis' | 'en_attente' | 'verifie' | 'rejete'
export type TransactionType = 'depot' | 'investissement' | 'retrait' | 'roi'
export type TransactionStatus = 'en_attente' | 'valide' | 'rejete'

export interface Campaign {
  id: string
  titre: string
  slug: string
  description: string
  descriptionCourte: string
  produit: string
  variete: string
  region: string
  ville: string
  lat?: number
  lng?: number
  cooperativeId: string
  cooperativeNom: string
  cooperativeMembers: number
  surface: number
  rendementAttendu: number
  montantCible: number
  montantLeve: number
  nombreInvestisseurs: number
  roiMin: number
  roiMax: number
  dureeJours: number
  dateDebut: string
  dateFin: string
  dateRecolte: string
  status: CampaignStatus
  risque: RiskLevel
  image: string
  images: string[]
  acheteur: string
  prixGarantiKg: number
  quantiteContratTonnes: number
  agronome: string
  scoreAgronomique: number
  assurance: boolean
  tags: string[]
  createdAt: string
}

export interface User {
  id: string
  nom: string
  prenom: string
  email: string
  telephone: string
  role: UserRole
  kycStatus: KycStatus
  ville: string
  pays: string
  dateInscription: string
  soldeWallet: number
  totalInvesti: number
  totalROI: number
  isActive: boolean
}

export interface Investment {
  id: string
  userId: string
  campaignId: string
  campaignTitre: string
  campaignProduit: string
  montant: number
  roiExpected: number
  roiActual?: number
  dateInvestissement: string
  dateRetourPrev: string
  status: 'actif' | 'termine' | 'en_attente'
}

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  montant: number
  status: TransactionStatus
  description: string
  reference: string
  methodePaiement?: string
  campaignId?: string
  date: string
}

export interface Notification {
  id: string
  userId: string
  type: 'roi' | 'campagne' | 'rapport' | 'kyc' | 'systeme'
  titre: string
  message: string
  lu: boolean
  date: string
  link?: string
}

export interface BlogPost {
  id: string
  slug: string
  titre: string
  extrait: string
  contenu: string
  auteur: string
  categorie: string
  image: string
  datePublication: string
  tempsLecture: number
  tags: string[]
}