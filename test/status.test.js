// Generated by CoffeeScript 1.7.1
(function() {
  var GIT_STATUS, GIT_STATUS_CLEAN, GIT_STATUS_NOT_CLEAN, Status, fixtures, git, should;

  should = require('should');

  fixtures = require('./fixtures');

  git = require('../src');

  Status = require('../src/status');

  GIT_STATUS = " M cheese.txt\nD  crackers.txt\nM  file.txt\n?? pickles.txt";

  GIT_STATUS_CLEAN = "";

  GIT_STATUS_NOT_CLEAN = "A  lib/index.js\n M npm-shrinkwrap.json\n M package.json";

  describe("Status", function() {
    return describe("()", function() {
      describe("when there are no changes", function() {
        var repo, status;
        repo = fixtures.status;
        status = new Status.Status(repo);
        status.parse(GIT_STATUS_CLEAN);
        return it("is clean", function() {
          return status.clean.should.be["true"];
        });
      });
      describe("when there are changes", function() {
        var repo, status;
        repo = fixtures.status;
        status = new Status.Status(repo);
        status.parse(GIT_STATUS_NOT_CLEAN);
        return it("is not clean", function() {
          return status.clean.should.be["false"];
        });
      });
      return describe("when there are changes", function() {
        var repo, status;
        repo = fixtures.status;
        status = new Status.Status(repo);
        status.parse(GIT_STATUS);
        it("has a modified staged file", function() {
          status.files["file.txt"].staged.should.be["true"];
          status.files["file.txt"].type.should.eql("M");
          return status.files["file.txt"].tracked.should.be["true"];
        });
        it("has a modified unstaged file", function() {
          status.files["cheese.txt"].staged.should.be["false"];
          status.files["cheese.txt"].type.should.eql("M");
          return status.files["cheese.txt"].tracked.should.be["true"];
        });
        it("has a deleted file", function() {
          status.files["crackers.txt"].staged.should.be["true"];
          status.files["crackers.txt"].type.should.eql("D");
          return status.files["crackers.txt"].tracked.should.be["true"];
        });
        it("has an untracked file", function() {
          status.files["pickles.txt"].tracked.should.be["false"];
          return should.not.exist(status.files["pickles.txt"].type);
        });
        return it("is not clean", function() {
          return status.clean.should.be["false"];
        });
      });
    });
  });

}).call(this);