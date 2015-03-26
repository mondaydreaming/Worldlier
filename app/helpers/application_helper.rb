module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Worldlier"
    end
  end
end
