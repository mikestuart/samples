class Post < ActiveRecord::Base
	self.primary_key = "id"

	has_many :votes
	has_many :comments

end