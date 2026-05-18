class GetPost {
  constructor(postRepository) {
    this.postRepository = postRepository;
  }

  async execute(id) {
    return await this.postRepository.findById(id);
  }
}

export default GetPost; 