import { IStravaSession, IUser, StravaSession, User } from "../mongo/models";

class UserRepository {

  async create(user: Partial<IUser>) {
    const dbUser = new User(user);
    return await dbUser.save();
  }

  async update(user: Partial<IUser>) {
    if (!user?.strava?.id) {
      throw new Error('No strava id provided')
    }

    let dbUser = await User.findOneAndUpdate({ "strava.id": user.strava.id }, user);
    if (!dbUser) {
      return await this.create(user);
    }

    return await dbUser.save();
  }

  async createSession(session: IStravaSession) {
    const dbSession = new StravaSession(session);
    return await dbSession.save();
  }

  async updateSession(session: IStravaSession) {
    let dbSession = await StravaSession.findOneAndUpdate({ strava_id: session.strava_id }, session);

    if (!dbSession) {
      return await this.createSession(session);
    }

    return await dbSession.save();
  }
}

export { UserRepository };
