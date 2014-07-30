// Generated by CoffeeScript 1.7.1
(function() {
  var Blob, Diff, _;

  _ = require('underscore');

  Blob = require('./blob');

  module.exports = Diff = (function() {
    function Diff(repo, a_path, b_path, a_blob, b_blob, a_mode, b_mode, new_file, deleted_file, diff, renamed_file, similarity_index) {
      this.repo = repo;
      this.a_path = a_path;
      this.b_path = b_path;
      this.a_mode = a_mode;
      this.b_mode = b_mode;
      this.new_file = new_file;
      this.deleted_file = deleted_file;
      this.diff = diff;
      this.renamed_file = renamed_file != null ? renamed_file : false;
      this.similarity_index = similarity_index != null ? similarity_index : 0;
      if (a_blob !== null) {
        this.a_blob = new Blob(this.repo, {
          id: a_blob
        });
        this.a_sha = a_blob;
      }
      if (b_blob !== null) {
        this.b_blob = new Blob(this.repo, {
          id: b_blob
        });
        this.b_sha = b_blob;
      }
    }

    Diff.prototype.toJSON = function() {
      return {
        a_path: this.a_path,
        b_path: this.b_path,
        a_mode: this.a_mode,
        b_mode: this.b_mode,
        new_file: this.new_file,
        deleted_file: this.deleted_file,
        diff: this.diff,
        renamed_file: this.renamed_file,
        similarity_index: this.similarity_index
      };
    };

    Diff.parse = function(repo, text) {
      var a_blob, a_mode, a_path, b_blob, b_mode, b_path, deleted_file, diff, diff_lines, diffs, lines, m, new_file, renamed_file, sim_index, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      lines = text.split("\n");
      diffs = [];
      while (lines.length && lines[0]) {
        _ref = /^diff\s--git\s"?a\/(.+?)"?\s"?b\/(.+)"?$/.exec(lines.shift()), m = _ref[0], a_path = _ref[1], b_path = _ref[2];
        if (/^old mode/.test(lines[0])) {
          _ref1 = /^old mode (\d+)/.exec(lines.shift()), m = _ref1[0], a_mode = _ref1[1];
          _ref2 = /^new mode (\d+)/.exec(lines.shift()), m = _ref2[0], b_mode = _ref2[1];
        }
        if (!lines.length || /^diff --git/.test(lines[0])) {
          diffs.push(new Diff(repo, a_path, b_path, null, null, a_mode, b_mode, false, false, null));
          continue;
        }
        sim_index = 0;
        new_file = false;
        deleted_file = false;
        renamed_file = false;
        if (/^new file/.test(lines[0])) {
          _ref3 = /^new file mode (.+)$/.exec(lines.shift()), m = _ref3[0], b_mode = _ref3[1];
          a_mode = null;
          new_file = true;
        } else if (/^deleted file/.test(lines[0])) {
          _ref4 = /^deleted file mode (.+)$/.exec(lines.shift()), m = _ref4[0], a_mode = _ref4[1];
          b_mode = null;
          deleted_file = true;
        } else if (m = /^similarity index (\d+)\%/.exec(lines[0])) {
          sim_index = m[1].to_i;
          renamed_file = true;
          lines.shift();
          lines.shift();
        }
        _ref5 = /^index\s([0-9A-Fa-f]+)\.\.([0-9A-Fa-f]+)\s?(.+)?$/.exec(lines.shift()), m = _ref5[0], a_blob = _ref5[1], b_blob = _ref5[2], b_mode = _ref5[3];
        if (b_mode) {
          b_mode = b_mode.trim();
        }
        diff_lines = [];
        while (lines[0] && !/^diff/.test(lines[0])) {
          diff_lines.push(lines.shift());
        }
        diff = diff_lines.join("\n");
        diffs.push(new Diff(repo, a_path, b_path, a_blob, b_blob, a_mode, b_mode, new_file, deleted_file, diff, renamed_file, sim_index));
      }
      return diffs;
    };

    Diff.parse_raw = function(repo, text) {
      var a_mode, a_path, a_sha, b_mode, b_path, b_sha, deleted_file, diffs, line, lines, new_file, renamed_file, status, _i, _len, _ref;
      lines = _.compact(text.split("\n"));
      diffs = [];
      for (_i = 0, _len = lines.length; _i < _len; _i++) {
        line = lines[_i];
        line = line.slice(1);
        line = line.replace(/\.\.\./g, '');
        _ref = line.split(/\s/), a_mode = _ref[0], b_mode = _ref[1], a_sha = _ref[2], b_sha = _ref[3], status = _ref[4], a_path = _ref[5], b_path = _ref[6];
        if (!b_path) {
          b_path = a_path;
        }
        new_file = status === 'M';
        deleted_file = status === 'D';
        renamed_file = status === 'R';
        diffs.push(new Diff(repo, a_path, b_path, a_sha, b_sha, a_mode, b_mode, new_file, deleted_file, null, renamed_file, null));
      }
      return diffs;
    };

    return Diff;

  })();

}).call(this);
