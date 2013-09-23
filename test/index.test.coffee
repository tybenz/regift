should = require 'should'
git    = require '../src'
Repo   = require '../src/repo'
{exec} = require 'child_process'

describe "git", ->
  describe "()", ->
    repo = git "#{__dirname}/fixtures/simple"
    
    it "returns a Repo", ->
      repo.should.be.an.instanceof Repo

  describe "clone()", ->
    @timeout 30000
    repo = null
    newRepositoryDir = "#{__dirname}/fixtures/clone"
    before (done) ->
      git.clone "git@github.com:sentientwaffle/gift.git", newRepositoryDir, (err, _repo) ->
        repo = _repo
        done err
    it "clone a repository", (done) ->
      repo.should.be.an.instanceof Repo
      repo.remote_list (err, remotes) ->
        remotes.should.have.length 1
        done()
    after (done) ->
      exec "rm -rf #{newRepositoryDir}", done