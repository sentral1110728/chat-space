class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :centent, presence: true, unless: :image?
  mount_uploader :image, ImageUploder
end
