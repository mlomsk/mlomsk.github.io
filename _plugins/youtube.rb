class YouTube < Liquid::Tag
  Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

  def initialize(tagName, markup, tokens)
    super

    if markup =~ Syntax then
      @id = $1
      @width  = $3.nil? ? 560 : $3.to_i
      @height = $4.nil? ? 420 : $4.to_i
    else
      raise "No YouTube ID provided in the \"youtube\" tag"
    end
  end

  def render(context)
    "<iframe width=\"#{@width}\" height=\"#{@height}\" src=\"http://www.youtube.com/embed/#{@id}?color=white&theme=light&rel=0&amp;showinfo=0\" frameborder=\"0\" allowfullscreen></iframe>"
  end

  Liquid::Template.register_tag "youtube", self
end
