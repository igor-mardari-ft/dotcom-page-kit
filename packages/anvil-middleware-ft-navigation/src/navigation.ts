import { Request, Response, NextFunction } from 'express'
import delve from 'dlv'

import { TNavigationLinks } from './types'
import { Navigation, TNavOptions, TNavMenus } from '@financial-times/anvil-server-ft-navigation'
import { navigationEditions } from './navigation-editions'

type MiddlewareOptions = TNavOptions & {
  enableSubNavigation?: boolean
}

const defaultOptions: MiddlewareOptions = {
  enableSubNavigation: false
}

export const getNavigationLinks = (menuData: TNavMenus, currentEdition: string): TNavigationLinks => {
  const menuKeys = ['account', 'user', 'anon', 'footer', 'navbar-simple', 'navbar-right', 'navbar-right-anon']
  const navbar = menuData[`navbar-${currentEdition}`]
  const drawer = menuData[`drawer-${currentEdition}`]

  return menuKeys.reduce(
    (acc, menuId) => {
      acc[menuId] = menuData[menuId]
      return acc
    },
    { navbar, drawer }
  )
}

export const init = (userOptions: MiddlewareOptions = {}) => {
  const { enableSubNavigation, ...navOptions } = { ...defaultOptions, ...userOptions }
  const navigator = new Navigation(navOptions)

  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const [menuData, subNavigation] = await Promise.all([
        navigator.getMenuData(request.path),
        enableSubNavigation ? navigator.getSubNavigation(request.path) : null
      ])
      const currentPath = request.path

      const editions = navigationEditions(request, response)
      const currentEdition = delve(editions, 'current.id', 'uk')

      response.locals.navigation = {
        currentPath,
        subNavigation,
        ...getNavigationLinks(menuData, currentEdition)
      }
      response.locals.navigation.editions = editions

      next()
    } catch (error) {
      next(error)
    }
  }
}
