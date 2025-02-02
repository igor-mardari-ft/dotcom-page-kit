import { TNavigationData } from '@financial-times/dotcom-types-navigation'

export type THeaderOptions = {
  variant?: THeaderVariant
  userIsAnonymous?: boolean
  userIsLoggedIn?: boolean
  showSubNavigation?: boolean
  showUserNavigation?: boolean
  showStickyHeader?: boolean
  showMegaNav?: boolean
  showLogoLink?: boolean
}

export type THeaderProps = THeaderOptions & {
  data: TNavigationData
}

export type THeaderVariant = 'simple' | 'large-logo'
