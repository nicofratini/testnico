export const parameters = {
  title: 'Paramètres',
  initialCapital: 'Capital Initial',
  numberOfCycles: 'Nombre de Cycles',
  enableLeverage: 'Activer Effet de Levier',
  placementRate: 'Taux de Placement',
  ltv: 'LTV',
  creditRate: 'Taux de Crédit',
  
  cycleSettings: 'Paramètres du Cycle',
  cycleDuration: 'Durée du Cycle',
  saleMargin: 'Marge à la Revente',
  fundingPhases: 'Phases de Financement',
  
  month: 'Mois',
  percentage: 'Pourcentage',
  description: 'Description',
  addPhase: 'Ajouter une Phase',
  totalPercentage: 'Pourcentage Total',
  
  cycleLabels: {
    cycle1: '1 Cycle (24 Mois)',
    cycle2: '2 Cycles (48 Mois)',
    cycle3: '3 Cycles (72 Mois)'
  },
  
  tooltips: {
    initialCapital: "Montant initial de l'investissement",
    placementRate: 'Taux de rendement annuel sur le capital placé',
    ltv: 'Ratio Loan-to-Value pour effet de levier',
    creditRate: "Taux d'intérêt annuel sur le crédit"
  },
  
  validation: {
    totalMustBe100: 'Le total des pourcentages doit être égal à 100%',
    invalidDuration: 'La durée doit être comprise entre 12 et 60 mois',
    invalidMargin: 'La marge doit être comprise entre 0 et 100%'
  }
};