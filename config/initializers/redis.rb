# Load the redis.yml configuration file
redis_config = YAML.load_file(Rails.root + 'config/redis.yml')[Rails.env]
Redis.current =  Redis.new host: redis_config['host'], port: redis_config['port']
