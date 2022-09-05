import mongoose from 'mongoose'

const boatSchema = mongoose.Schema({
      boatName: {
            type: String,
            required: true
      },
      boatNo: {
            type: String,
            required: true
      },
      boatType: {
            type: String,
            required: true
      },
      length: {
            type: String,
            required: true
      },
      depth: {
            type: String,
            required: true
      },
      engineRange: {
            type: Number,
            required: true
      },
      speed: {
            type: String,
            required: true
      },
      maxMembers: {
            type: Number,
            required: true
      },
      fishCapacity: {
            type: String,
            required: true
      },
      fuelCapacity: {
        type: Number,
        required: true
      },
      description: {
            type: String,
            required: true
      },
}, {
      timestamps: true,
})

const Boats = mongoose.model('boats', boatSchema)

export default Boats