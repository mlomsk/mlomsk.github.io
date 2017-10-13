require "rake"

task default: :build

desc "Build the site."
task :build do
  sh "bundle exec jekyll build"
end

desc "Run html proofer to validate the HTML output."
task test: :build do
  require "html-proofer"
  HTMLProofer.check_directory(
    "./_site",
    parallel: { in_threads: 4 },
    favicon: true,
    assume_extension: true,
    check_favicon: true,
    check_opengraph: true,
    url_ignore: [],
    empty_alt_ignore: true,
    disable_external: true
  ).run
end