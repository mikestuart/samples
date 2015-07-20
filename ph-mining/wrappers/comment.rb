class Comment < ActiveRecord::Base
	self.primary_key = "id"
	
	belongs_to :post
	belongs_to :user

end