import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  },
  _userId: {
    type: String,
    required: true
  },
  _photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ]
})

const labelSchema = new mongoose.Schema({
  _name: {
    type: String,
    required: true
  },
  _photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ]
})

const photoSchema = new mongoose.Schema({
  _title: {
    type: String,
    required: true
  },
  _description: {
    type: String,
    required: false
  },
  _date: {
    type: Date,
    required: false
  },
  _uri: {
    type: String,
    required: true
  },
  _userId: {
    type: String,
    required: true
  },
  _createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true
  },
  _albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Album'
    }
  ],
  _labels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Label'
    }
  ]
})

const userSchema = new mongoose.Schema({
  _username: {
    type: String,
    required: true
  },
  _email: {
    type: String,
    required: false
  },
  _password: {
    type: String,
    required: true
  },
  _role: {
    type: String,
    required: true
  },
  _photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo'
    }
  ]
})

const album = mongoose.model('Album', albumSchema)
const label = mongoose.model('Label', labelSchema)
const photo = mongoose.model('Photo', photoSchema)
const user = mongoose.model('User', userSchema)

export const models = {
  album,
  label,
  photo,
  user
}
