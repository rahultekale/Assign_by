import React, { useState } from 'react';
import { Card, CardContent } from '../src/components/ui/Card'
import { Input } from '../src/components/ui/Input';
import { Button } from '../src/components/ui/Button';
import { Textarea } from '../src/components/ui/Textarea';
import { Tabs, Tab } from '../src/components/ui/Tabs';


const UserRegistration = () => {
  const [step, setStep] = useState(1);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', password: '' });
  const [orgInfo, setOrgInfo] = useState({ name: '', website: '', description: '' });
  const [verificationCode, setVerificationCode] = useState('');
  const [webPages, setWebPages] = useState([
    { id: 1, url: 'https://example.com/page1', status: 'Scraped', chunks: ['Chunk 1', 'Chunk 2'] },
    { id: 2, url: 'https://example.com/page2', status: 'Pending', chunks: [] },
    { id: 3, url: 'https://example.com/page3', status: 'Scraped', chunks: ['Chunk A', 'Chunk B'] },
  ]);
  const [selectedPage, setSelectedPage] = useState(null);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <div className="p-4 space-y-6">
      {step === 1 && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">User Registration</h2>
            <Input
              name="name"
              placeholder="Name"
              value={userInfo.name}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="mb-4"
            />
            <Input
              name="email"
              placeholder="Email"
              value={userInfo.email}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="mb-4"
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={(e) => handleInputChange(e, setUserInfo)}
              className="mb-4"
            />
            <Button className="w-full mb-4">Continue with Google</Button>
            <Button onClick={() => setStep(2)} className="w-full">Submit</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Email Verification</h2>
            <Input
              name="verificationCode"
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-4"
            />
            <Button onClick={() => setStep(3)} className="w-full">Verify</Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Setup Organisation</h2>
            <Input
              name="name"
              placeholder="Company Name"
              value={orgInfo.name}
              onChange={(e) => handleInputChange(e, setOrgInfo)}
              className="mb-4"
            />
            <Input
              name="website"
              placeholder="Company Website URL"
              value={orgInfo.website}
              onChange={(e) => handleInputChange(e, setOrgInfo)}
              className="mb-4"
            />
            <Textarea
              name="description"
              placeholder="Company Description"
              value={orgInfo.description}
              onChange={(e) => handleInputChange(e, setOrgInfo)}
              className="mb-4"
            />
            <Button onClick={() => setStep(4)} className="w-full">Next</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Web Pages Scraping Status</h2>
            <Tabs>
              <Tab label="Web Pages">
                <ul className="space-y-2">
                  {webPages.map((page) => (
                    <li
                      key={page.id}
                      className="border rounded p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePageClick(page)}
                    >
                      <div className="flex justify-between">
                        <span>{page.url}</span>
                        <span className={page.status === 'Scraped' ? 'text-green-600' : 'text-yellow-600'}>
                          {page.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Tab>
              {selectedPage && (
                <Tab label="Page Details">
                  <h3 className="text-lg font-bold mb-2">{selectedPage.url}</h3>
                  <ul className="list-disc ml-4">
                    {selectedPage.chunks.length > 0 ? (
                      selectedPage.chunks.map((chunk, index) => (
                        <li key={index}>{chunk}</li>
                      ))
                    ) : (
                      <li>No data chunks available.</li>
                    )}
                  </ul>
                </Tab>
              )}
            </Tabs>
            <Button onClick={() => alert('Moving to the next part of setup')} className="mt-4 w-full">Next</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserRegistration;
