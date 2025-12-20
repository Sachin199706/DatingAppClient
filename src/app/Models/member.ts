export interface Member {
  id: number
  username: string
  email: string
  age: number
  photoUrl: string
  knownAs: string
  created: Date
  lastActive: Date
  gender: string
  introduction: string
  interests: any
  lookingFor: any
  city: string
  country: string
  photos: Photo[]
}

export interface Photo {
  id: number
  url: string
  isMain: boolean
}
