import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateSubscriberDto } from "./create-subscriber.dto";
import { Subscriber } from "./subscriber.entity";

@Controller()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscribersRepository: Repository<Subscriber>,
  ) {}

  @GrpcMethod()
  async addSubscriber(subscriber: CreateSubscriberDto) {
    const newSubscriber = await this.subscribersRepository.create(subscriber);
    await this.subscribersRepository.save(newSubscriber);
    return newSubscriber;
  }

  @GrpcMethod()
  async getAllSubscribers() {
    const data = await this.subscribersRepository.find();
    return {
      data
    }
  }
}
