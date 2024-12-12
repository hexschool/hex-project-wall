interface RelLink {
  routeName: string
  url: string
  urlText: string
}
interface Course {
  name: string
  category: string
  description: string
}

export interface Project {
  id: string
  year: string
  name: string
  course: string
  tags: string[]
  title: string
  url: string
  git_repo: string
  thumbnail: string
  thumbnail_small: string
  description: string
  social_fb_link: string
  social_github_link: string
  social_behance_link: string
  is_display: string
  course_tag: string
  六角審核: boolean
}

export interface CourseCategory extends Course {
  id: number
  isActive: boolean
  relLinks: RelLink[]
}

export interface CourseCategoryDetail extends Course {
  relLinks: RelLink[]
}
