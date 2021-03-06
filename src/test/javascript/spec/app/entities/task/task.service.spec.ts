/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { TaskService } from 'app/entities/task/task.service';
import { ITask, Task } from 'app/shared/model/task.model';

describe('Service Tests', () => {
    describe('Task Service', () => {
        let injector: TestBed;
        let service: TaskService;
        let httpMock: HttpTestingController;
        let elemDefault: ITask;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TaskService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Task(0, 'AAAAAAA', currentDate, currentDate, 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        actionDate: currentDate.format(DATE_FORMAT),
                        entryDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Task', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        actionDate: currentDate.format(DATE_FORMAT),
                        entryDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        actionDate: currentDate,
                        entryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Task(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Task', async () => {
                const returnedFromService = Object.assign(
                    {
                        action: 'BBBBBB',
                        actionDate: currentDate.format(DATE_FORMAT),
                        entryDate: currentDate.format(DATE_FORMAT),
                        type: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        actionDate: currentDate,
                        entryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Task', async () => {
                const returnedFromService = Object.assign(
                    {
                        action: 'BBBBBB',
                        actionDate: currentDate.format(DATE_FORMAT),
                        entryDate: currentDate.format(DATE_FORMAT),
                        type: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        actionDate: currentDate,
                        entryDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Task', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
