require 'irb'
require 'sqlite3'
require 'active_record'
require 'logger'
require 'algorithmia'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :database => 'producthunt.db'
)

# Specify your API Key below to experiment with different algorithms
#Algorithmia.api_key = "API_KEY"

def reload
	load 'wrappers/post.rb'
	load 'wrappers/vote.rb'
	load 'wrappers/user.rb'
	load 'wrappers/comment.rb'
	load 'wrappers/irb_helper.rb'
end

# Drop to IRB
reload
IRB.start_session(Kernel.binding)