import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient, SocialInsuranceCalculation as PrismaSocialInsuranceCalculation } from '@prisma/client';
import {
  fetchSocialInsuranceCalculationDetailsHandler,
  addSocialInsuranceCalculationHandler,
  updateSocialInsuranceCalculationHandler
} from '../src/controllers/socialInsuranceCalculationController';

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());

app.get('/api/social-insurance-calculation/:socialInsuranceCalculationId', fetchSocialInsuranceCalculationDetailsHandler);
app.post('/api/social-insurance-calculation', addSocialInsuranceCalculationHandler);
app.put('/api/social-insurance-calculation/:socialInsuranceCalculationId', updateSocialInsuranceCalculationHandler);

jest.mock('@prisma/client', () => {
  const actualPrisma = jest.requireActual('@prisma/client');
  return {
    ...actualPrisma,
    PrismaClient: jest.fn().mockImplementation(() => ({
      socialInsuranceCalculation: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      $disconnect: jest.fn(),
    })),
  };
});

describe('Social Insurance Calculation Controller', () => {
  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/social-insurance-calculation/:socialInsuranceCalculationId', () => {
    it('should fetch social insurance calculation details', async () => {
      const mockData: PrismaSocialInsuranceCalculation = {
        id: 1,
        longTermInsurancePercentage: 5.5,
        healthInsurancePercentage: 4.2,
        employeePensionPercentage: 3.0,
        pensionStartSalary: 2000,
        pensionEndSalary: 5000,
        regularEmployeeInsurancePercentage: 2.5,
        specialEmployeeInsurancePercentage: 1.8,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.socialInsuranceCalculation.findUnique as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).get('/api/social-insurance-calculation/1');

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockData);
    });

    it('should return an error if social insurance calculation not found', async () => {
      (prisma.socialInsuranceCalculation.findUnique as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/social-insurance-calculation/999');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Social insurance calculation not found');
    });
  });

  describe('POST /api/social-insurance-calculation', () => {
    it('should create a new social insurance calculation', async () => {
      const newCalculation = {
        longTermInsurancePercentage: 5.5,
        healthInsurancePercentage: 4.2,
        employeePensionPercentage: 3.0,
        pensionStartSalary: 2000,
        pensionEndSalary: 5000,
        regularEmployeeInsurancePercentage: 2.5,
        specialEmployeeInsurancePercentage: 1.8
      };

      const mockData = { ...newCalculation, id: 1, createdAt: new Date(), updatedAt: new Date() };

      (prisma.socialInsuranceCalculation.create as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).post('/api/social-insurance-calculation').send(newCalculation);

      expect(response.status).toBe(201);
      expect(response.body.data).toEqual(mockData);
    });

    it('should return an error if data is invalid', async () => {
      const invalidCalculation = {
        longTermInsurancePercentage: 5.5,
      };

      const response = await request(app).post('/api/social-insurance-calculation').send(invalidCalculation);

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('message', 'Failed to add social insurance calculation details');
    });
  });

  describe('PUT /api/social-insurance-calculation/:socialInsuranceCalculationId', () => {
    it('should update social insurance calculation details', async () => {
      const updatedCalculation = {
        longTermInsurancePercentage: 6.0,
        healthInsurancePercentage: 4.5,
        employeePensionPercentage: 3.5,
        pensionStartSalary: 2100,
        pensionEndSalary: 5100,
        regularEmployeeInsurancePercentage: 2.6,
        specialEmployeeInsurancePercentage: 1.9
      };

      const mockData: PrismaSocialInsuranceCalculation = { ...updatedCalculation, id: 1, createdAt: new Date(), updatedAt: new Date() };

      (prisma.socialInsuranceCalculation.findUnique as jest.Mock).mockResolvedValue(mockData);
      (prisma.socialInsuranceCalculation.update as jest.Mock).mockResolvedValue(mockData);

      const response = await request(app).put('/api/social-insurance-calculation/1').send(updatedCalculation);

      expect(response.status).toBe(200);
      expect(response.body.data).toEqual(mockData);
    });

    it('should return an error if social insurance calculation not found', async () => {
      (prisma.socialInsuranceCalculation.findUnique as jest.Mock).mockResolvedValue(null);

      const updatedCalculation = {
        longTermInsurancePercentage: 6.0,
        healthInsurancePercentage: 4.5,
      };

      const response = await request(app).put('/api/social-insurance-calculation/999').send(updatedCalculation);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Social insurance calculation not found');
    });
  });
});