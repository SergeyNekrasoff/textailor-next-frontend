import { AppPages } from '../router'

interface IRoute<T extends object = object> {
  name: string
  params: T
}

export class AppRoutes {
  private constructor() {}

  static getDashboard() {
    return getRoute(AppPages.dashboard, {})
  }

  // static getProjects() {
  //   return getRoute(AppPages.projects, {})
  // }

  // static getProject() {
  //   return getRoute(AppPages.project, {})
  // }

  // static getEditor() {
  //   return getRoute(AppPages.editor, {})
  // }

  // static getTemplates() {
  //   return getRoute(AppPages.templates, {})
  // }

  // static getHistory() {
  //   return getRoute(AppPages.history, {})
  // }

  // static getProfile() {
  //   return getRoute(AppPages.profile, {})
  // }

  // static getSettings() {
  //   return getRoute(AppPages.settings, {})
  // }

  // static getUIKit() {
  //   return getRoute(AppPages.UIKit, {})
  // }

  static getNotFound() {
    return getRoute(AppPages.notFound, {})
  }
}

// TODO необязательный 2й параметр
function getRoute<T extends object = object>(name: string, params: T): IRoute<T> {
  return {
    name,
    params
  }
}
