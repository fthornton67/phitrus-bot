import * as mongoose from 'mongoose';


var Schema = mongoose.Schema;

/**
 * Schema definitions.
 */

mongoose.model('OAuthTokens', new Schema({
  accessToken: { type: String },
  accessTokenExpiresOn: { type: Date },
  client : { type: Object },  // `client` and `user` are required in multiple places, for example `getAccessToken()`
  clientId: { type: String },
  refreshToken: { type: String },
  refreshTokenExpiresOn: { type: Date },
  user : { type: Object },
  userId: { type: String },
}));

mongoose.model('OAuthClients', new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  redirectUris: { type: Array }
}));

mongoose.model('OAuthUsers', new Schema({
  email: { type: String, default: '' },
  phone: { type: String},
  firstname: { type: String },
  lastname: { type: String },
  password: { type: String },
  username: { type: String }
}));

class Model {
public  OAuthTokensModel = mongoose.model('OAuthTokens');
public  OAuthClientsModel = mongoose.model('OAuthClients');
public  OAuthUsersModel = mongoose.model('OAuthUsers');

  /**
   * Get access token.
   */

 getAccessToken = (bearerToken) => {
    // Adding `.lean()`, as we get a mongoose wrapper object back from `findOne(...)`, and oauth2-server complains.
    return this.OAuthTokensModel.findOne({ accessToken: bearerToken }).lean();
  };

  /**
   * Get client.
   */

   getClient = (clientId, clientSecret) => {
    return this.OAuthClientsModel.findOne({
      clientId: clientId,
      clientSecret: clientSecret
    }).lean();
  };

  /**
   * Get refresh token.
   */

   getRefreshToken = (refreshToken) => {
    return this.OAuthTokensModel.findOne({ refreshToken: refreshToken }).lean();
  };

  /**
   * Get user.
   */

   getUser = function(username, password) {
    return this.OAuthUsersModel.findOne({
      username: username,
      password: password
    }).lean();
  };

  /**
   * Save token.
   */

   saveToken = function(token, client, user) {
    var accessToken = new this.OAuthTokensModel({
      accessToken: token.accessToken,
      accessTokenExpiresOn: token.accessTokenExpiresOn,
      client: client,
      clientId: client.clientId,
      refreshToken: token.refreshToken,
      refreshTokenExpiresOn: token.refreshTokenExpiresOn,
      user: user,
      userId: user._id
    });
    // Can't just chain `lean()` to `save()` as we did with `findOne()` elsewhere. Instead we use `Promise` to resolve the data.
    return new Promise(function(resolve, reject) {
      accessToken.save(function(err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    }).then(function(saveResult) {
      // `saveResult` is mongoose wrapper object, not doc itself. Calling `toJSON()` returns the doc.
      /*saveResult =
        saveResult && typeof saveResult == "object"
          ? saveResult
          : saveResult;
*/
      // Unsure what else points to `saveResult` in oauth2-server, making copy to be safe
      var data = new Object();
      for (var prop in saveResult) data[prop] = saveResult[prop];

      // /oauth-server/lib/models/token-model.js complains if missing `client` and `user`. Creating missing properties.
      //data.client = data.clientId;
      //data.user = data.userId;

      return data;
    });
  };
}
export { Model };
