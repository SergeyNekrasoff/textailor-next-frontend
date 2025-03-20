import { AppPages } from '../router'

interface IRoute<T extends object = {}> {
  name: string
  params: T
}

export class AppRoutes {
  private constructor() {}

  static getLogin() {
    return getRoute(AppPages.login, {})
  }

  static getSignup() {
    return getRoute(AppPages.signup, {})
  }

  static getDashboard() {
    return getRoute(AppPages.dashboard, {})
  }

  static getDocuments() {
    return getRoute(AppPages.documents, {})
  }

  static getDocument() {
    return getRoute(AppPages.document, {})
  }

  static getTemplates() {
    return getRoute(AppPages.templates, {})
  }

  static getHistory() {
    return getRoute(AppPages.history, {})
  }

  static getProfile() {
    return getRoute(AppPages.profile, {})
  }

  static getBilling() {
    return getRoute(AppPages.billing, {})
  }

  static getUIKit() {
    return getRoute(AppPages.UIKit, {})
  }

  static getNotFound() {
    return getRoute(AppPages.notFound, {})
  }
}

// TODO необязательный 2й параметр
function getRoute<T extends object = {}>(name: string, params: T): IRoute<T> {
  return {
    name,
    params
  }
}
