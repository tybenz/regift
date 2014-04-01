_ = require 'underscore'
    if a_blob isnt null
      @a_blob = new Blob @repo, {id: a_blob}
      @a_sha = a_blob
    if b_blob isnt null
      @b_blob = new Blob @repo, {id: b_blob}
      @b_sha = b_blob
      # FIXME shift is O(n), so iterating n over O(n) operation might be O(n^2)
  # Public: Parse the raw diff format from the command output.
  #
  # text - String stdout of a `git diff` command.
  #
  # Returns Array of Diff.
  @parse_raw: (repo, text) ->
    lines = _.compact(text.split "\n")
    diffs = []

    for line in lines
      line = line[1..-1] # get rid of leading ':'
      line = line.replace(/\.\.\./g, '')
      [a_mode, b_mode, a_sha, b_sha, status, a_path, b_path] = line.split(/\s/)
      b_path = a_path unless b_path
      new_file = status is 'M'
      deleted_file = status is 'D'
      renamed_file = status is 'R'

      diffs.push new Diff(
        repo, a_path, b_path, a_sha, b_sha, a_mode, b_mode,
        new_file, deleted_file, null, renamed_file, null
      )

    return diffs