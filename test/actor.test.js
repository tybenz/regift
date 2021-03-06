// Generated by CoffeeScript 1.7.1
(function() {
  var Actor, should;

  should = require('should');

  Actor = require('../src/actor');

  describe("Actor", function() {
    describe(".constructor", function() {
      var actor;
      actor = new Actor("bob", "bob@example.com");
      it("assigns @name", function() {
        return actor.name.should.eql("bob");
      });
      return it("assigns @email", function() {
        return actor.email.should.eql("bob@example.com");
      });
    });
    describe("#toString", function() {
      var actor;
      actor = new Actor("bob", "bob@example.com");
      return it("is a string representation of the actor", function() {
        return actor.toString().should.eql("bob <bob@example.com>");
      });
    });
    describe("#hash", function() {
      var actor;
      actor = new Actor("bob", "bob@example.com");
      return it("is the md5 hash of the email", function() {
        return actor.hash.should.eql("4b9bb80620f03eb3719e0a061c14283d");
      });
    });
    return describe(".from_string", function() {
      describe("with a name and email", function() {
        var actor;
        actor = Actor.from_string("bob <bob@example.com>");
        it("parses the name", function() {
          return actor.name.should.eql("bob");
        });
        return it("parses the email", function() {
          return actor.email.should.eql("bob@example.com");
        });
      });
      return describe("with only a name", function() {
        var actor;
        actor = Actor.from_string("bob");
        it("parses the name", function() {
          return actor.name.should.eql("bob");
        });
        return it("does not parse the email", function() {
          return should.not.exist(actor.email);
        });
      });
    });
  });

}).call(this);
