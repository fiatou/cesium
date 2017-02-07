/**
 * Created by blavenie on 01/02/17.
 */
function Block(json) {
  "use strict";

  var that = this;

  Object.keys(json).forEach(function (key) {
    that[key] = json[key];
  });


  this.identitiesCount = this.identities ? this.identities.length : 0;;
  this.joinersCount = this.joiners ? this.joiners.length : 0;
  this.activesCount = this.actives ? this.actives.length : 0;
  this.leaversCount = this.leavers ? this.leavers.length : 0;
  this.revokedCount = this.revoked ? this.revoked.length : 0;
  this.excludedCount = this.excluded ? this.excluded.length : 0;
  this.certificationsCount = this.certifications ? this.certifications.length : 0;
  this.transactionsCount = this.transactions ? this.transactions.length : 0;

  that.empty = that.isEmpty();
}

Block.prototype.isEmpty = function(){
  "use strict";
  return !this.transactionsCount &&
    !this.certificationsCount &&
    !this.joinersCount &&
    !this.activesCount &&
    !this.identitiesCount &&
    !this.leaversCount &&
    !this.excludedCount &&
    !this.revokedCount &&
    !this.dividend
    ;
};

Block.prototype.parseData = function() {
  this.identities = this.parseArrayValues(this.identities, ['pubkey', 'signature', 'buid', 'uid']);
  this.joiners = this.parseArrayValues(this.joiners, ['pubkey', 'signature', 'mBuid', 'iBuid', 'uid']);
  this.actives = this.parseArrayValues(this.actives, ['pubkey', 'signature', 'mBuid', 'iBuid', 'uid']);
  this.leavers = this.parseArrayValues(this.leavers, ['pubkey', 'signature', 'mBuid', 'iBuid', 'uid']);
  this.revoked = this.parseArrayValues(this.revoked, ['pubkey', 'signature']);
  this.excluded = this.parseArrayValues(this.excluded, ['pubkey']);

  // certifications
  this.certifications = this.parseArrayValues(this.certifications, ['from', 'to', 'block', 'signature']);
  //this.certifications = _.groupBy(this.certifications, 'to');

  // TX
  this.transactions = this.parseTransactions(this.transactions);
};

Block.prototype.cleanData = function() {
  delete this.identities;
  delete this.joiners;
  delete this.actives;
  delete this.leavers;
  delete this.revoked;
  delete this.excluded;
  delete this.certifications;
  delete this.transactions;
};

Block.prototype.parseArrayValues = function(array, itemObjProperties){
  if (!array || !array.length) return [];
  return array.reduce(function(res, raw) {
    var parts = raw.split(':');
    if (parts.length != itemObjProperties.length) {
      console.debug('[block] Bad format for \'{0}\': [{1}]. Expected {1} parts. Skipping'.format(arrayProperty, raw, itemObjProperties.length));
      return res;
    }
    var obj = {};
    for (var i=0; i<itemObjProperties.length; i++) {
      obj[itemObjProperties[i]] = parts[i];
    }
    return res.concat(obj);
  }, []);
};

Block.prototype.regex = {
  TX_OUTPUT_SIG: /^SIG[(]([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44})[)]$/
};


Block.prototype.parseTransactions = function(transactions) {
  if (!transactions || !transactions.length) return [];
  return transactions.reduce(function (res, tx) {
    var obj = {
      issuers: tx.issuers,
      time: tx.time
    };

    obj.outputs = tx.outputs.reduce(function(res, output) {
      var parts = output.split(':');
      var matches = parts.length == 3 && Block.prototype.regex.TX_OUTPUT_SIG.exec(parts[2]);
      if (!matches) {
        console.debug('[block] Bad format a \'transactions\': [{1}]. Expected 3 parts. Skipping'.format(output));
        return res;
      }
      var pubkey = matches[1];
      if (!tx.issuers || tx.issuers.indexOf(pubkey) != -1) return res;
      var unitbase = parts[1];
      var amount = parts[0];
      return res.concat({
        amount: unitbase <= 0 ? amount : amount * Math.pow(10, unitbase),
        unitbase: unitbase,
        pubkey: pubkey
      });
    }, []);

    // TODO compute amount
    // TODO compute dest
    // TODO : group by pubkey ? using _.groupBy(list, iteratee, [context])

    return res.concat(obj);
  }, []);
};