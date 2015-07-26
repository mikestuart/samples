class User < ActiveRecord::Base
	self.primary_key = "id"

	has_many :comments
	has_many :votes

	def did_vote(post)
		return true if votes.where('post_id = ?', post.id).count > 0
		return false
	end

	def self.did_all_users_vote(post, users)
		for u in users
			return false unless u.did_vote(post)
		end

		return true
	end

end