import { ReadStream, WriteStream, createWriteStream } from 'fs'
import bcrypt from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'

const resolverFn = async (
  _,
  { firstName, lastName, username, email, password: newPassword, bio, avatar },
  { loggedInUser }
) => {
  const { filename, createReadStream } = await avatar
  const ReadStream = createReadStream()
  const WriteStream = createWriteStream(
    `${process.cwd()}/uploads/${Date.now()}-${filename}`
  )
  ReadStream.pipe(WriteStream)

  let uglyPassword = null
  if (newPassword) {
    uglyPassword = await bcrypt.hash(newPassword, 10)
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      email,
      bio,
      avatar,
      ...(uglyPassword && { password: uglyPassword }),
    },
  })
  if (updatedUser.id) {
    return {
      ok: true,
    }
  } else {
    return {
      ok: false,
      error: 'Could not update profile.',
    }
  }
}

export default {
  Mutation: {
    editProfile: protectedResolver(resolverFn),
  },
}
