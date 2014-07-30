// Generated by CoffeeScript 1.7.1
(function() {
  var Tag, fixtures, git, should;

  should = require('should');

  fixtures = require('./fixtures');

  git = require('../src');

  Tag = require('../src/tag');

  describe("Tag", function() {
    describe(".find_all", function() {
      var pref, repo, tags;
      repo = fixtures.tagged;
      tags = null;
      before(function(done) {
        return Tag.find_all(repo, function(err, _tags) {
          tags = _tags;
          return done(err);
        });
      });
      it("is an Array of Tags", function() {
        tags.should.be.an["instanceof"](Array);
        return tags[0].should.be.an["instanceof"](Tag);
      });
      pref = "the tag";
      it("" + pref + " has the correct name", function() {
        return tags[0].name.should.eql("tag-1");
      });
      return it("" + pref + " has the correct commit", function() {
        return tags[0].commit.id.should.eql("32bbb351de16c3e404b3b7c77601c3d124e1e1a1");
      });
    });
    return describe("#message", function() {
      var message, repo, tags;
      repo = fixtures.tagged;
      tags = null;
      message = null;
      before(function(done) {
        return repo.tags(function(err, _tags) {
          tags = _tags;
          if (err) {
            done(err);
          }
          return tags[0].message(function(err, _message) {
            message = _message;
            return done(err);
          });
        });
      });
      it("is the correct message", function() {
        return message.should.containEql("the first tag");
      });
      return it("has the correct commit", function() {
        return tags[0].commit.message.should.eql("commit 5");
      });
    });
  });

}).call(this);