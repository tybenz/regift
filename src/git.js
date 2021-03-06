// Generated by CoffeeScript 1.7.1
(function() {
  var Git, exec, fs, options_to_argv, spawn, _ref;

  fs = require('fs');

  _ref = require('child_process'), exec = _ref.exec, spawn = _ref.spawn;

  module.exports = Git = function(git_dir, dot_git) {
    var git;
    dot_git || (dot_git = "" + git_dir + "/.git");
    git = function(command, options, args, callback) {
      var bash, _ref1, _ref2;
      if (!callback) {
        _ref1 = [args, callback], callback = _ref1[0], args = _ref1[1];
      }
      if (!callback) {
        _ref2 = [options, callback], callback = _ref2[0], options = _ref2[1];
      }
      if (options == null) {
        options = {};
      }
      options = options_to_argv(options);
      options = options.join(" ");
      if (args == null) {
        args = [];
      }
      if (args instanceof Array) {
        args = args.join(" ");
      }
      bash = "" + Git.bin + " " + command + " " + options + " " + args;
      exec(bash, {
        cwd: git_dir,
        encoding: 'binary'
      }, callback);
      return bash;
    };
    git.cmd = function(command, options, args, callback) {
      return git(command, options, args, callback);
    };
    git.streamCmd = function(command, options, args) {
      var allargs, process;
      if (options == null) {
        options = {};
      }
      options = options_to_argv(options);
      if (args == null) {
        args = [];
      }
      allargs = [command].concat(options).concat(args);
      process = spawn(Git.bin, allargs, {
        cwd: git_dir,
        encoding: 'binary'
      });
      return [process.stdout, process.stderr];
    };
    git.list_remotes = function(callback) {
      return fs.readdir("" + dot_git + "/refs/remotes", function(err, files) {
        return callback(err, files || []);
      });
    };
    git.refs = function(type, options, callback) {
      var prefix, _ref1;
      if (!callback) {
        _ref1 = [options, callback], callback = _ref1[0], options = _ref1[1];
      }
      prefix = "refs/" + type + "s/";
      return git("show-ref", function(err, text) {
        var id, line, matches, name, _i, _len, _ref2, _ref3;
        if ((err != null ? err.code : void 0) === 1) {
          err = null;
        }
        matches = [];
        _ref2 = (text || "").split("\n");
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          line = _ref2[_i];
          if (!line) {
            continue;
          }
          _ref3 = line.split(' '), id = _ref3[0], name = _ref3[1];
          if (name.substr(0, prefix.length) === prefix) {
            matches.push("" + (name.substr(prefix.length)) + " " + id);
          }
        }
        return callback(err, matches.join("\n"));
      });
    };
    return git;
  };

  Git.bin = "git";

  Git.options_to_argv = options_to_argv = function(options) {
    var argv, key, val;
    argv = [];
    for (key in options) {
      val = options[key];
      if (key.length === 1) {
        if (val === true) {
          argv.push("-" + key);
        } else if (val === false) {

        } else {
          argv.push("-" + key);
          argv.push(val);
        }
      } else {
        if (val === true) {
          argv.push("--" + key);
        } else if (val === false) {

        } else {
          argv.push("--" + key + "=" + val);
        }
      }
    }
    return argv;
  };

}).call(this);
