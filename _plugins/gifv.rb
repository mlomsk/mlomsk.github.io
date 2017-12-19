class Gifv < Liquid::Tag
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
    """<video poster='//i.imgur.com/#{@id}h.jpg' preload='auto' autoplay='autoplay' muted='muted' loop='loop' webkit-playsinline='' style='width: #{@width}px; height: #{@height}px;'>
      <source src='//i.imgur.com/#{@id}.mp4' type='video/mp4'>
    </video>"""
  end

  Liquid::Template.register_tag "gifv", self
end
