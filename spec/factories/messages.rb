FactoryGirl.define do

  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/IMG_0359.png")
    user
    group
  end

end
